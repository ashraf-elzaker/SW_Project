from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializes User objects for API responses."""
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "user_type",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    """Handles user registration.

    Requirements changed:
    - Frontend must supply `username` (no full-name required during signup)
    - `email` is required and must be unique
    - `password` must pass Django's password validators (strength)
    """
    password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name", "user_type"]

    def validate(self, attrs):
        email = attrs.get("email")
        username = attrs.get("username")

                          
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})

                             
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})

                            
        if "user_type" not in attrs or not attrs["user_type"]:
            raise serializers.ValidationError({"user_type": "This field is required."})

                           
        password = attrs.get("password")
        try:
            validate_password(password)
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e)})

        return attrs

    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")

                                                                 
        original = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{original}_{counter}"
            counter += 1

        user = User(
            username=username,
            email=email,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            user_type=validated_data.get("user_type"),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Allow clients to pass `email` instead of `username` when obtaining JWT tokens."""

    def validate(self, attrs):
                                                         
        if "email" in attrs and not attrs.get(self.username_field):
            try:
                user = User.objects.get(email=attrs["email"])
                attrs[self.username_field] = user.get_username()
            except User.DoesNotExist:
                pass                                                                                   
        return super().validate(attrs)
