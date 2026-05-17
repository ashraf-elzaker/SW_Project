from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    RegisterSerializer,
    MyTokenObtainPairSerializer,
    UserSerializer,
)


                         
               
                         
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

                                                                                   
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "User registered successfully",
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


                         
                  
                         
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
                                                                                          
    serializer_class = TokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
                                                                            
                                                                         
                                                                                 
        data = request.data.copy()
        email_or_username = data.get('email') or data.get('username')
        if data.get('email') and not data.get('username'):
            try:
                user = User.objects.get(email=data.get('email'))
                data['username'] = user.username
            except User.DoesNotExist:
                                                                          
                return Response({"detail": "Email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

                                                                           
        try:
            print('DEBUG login request.data ->', dict(request.data))
        except Exception:
            print('DEBUG login request.data -> (could not convert)')
        print('DEBUG login payload used ->', data)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

                                       
        user_obj = None
        try:
            if '@' in str(email_or_username):
                user_obj = User.objects.get(email=email_or_username)
            else:
                user_obj = User.objects.get(username=email_or_username)
        except Exception:
            user_obj = None

        response_data = {
            'access': tokens.get('access'),
            'refresh': tokens.get('refresh'),
        }
        if user_obj:
            response_data['user'] = UserSerializer(user_obj).data

        return Response(response_data)
