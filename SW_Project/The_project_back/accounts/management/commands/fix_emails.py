from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Set/replace all user emails to username@gmail.com (ensures uniqueness)'

    def handle(self, *args, **options):
        users = User.objects.all()
        total = users.count()
        self.stdout.write(self.style.NOTICE(f"Found {total} users. Updating emails to '@gmail.com' domain..."))
        updated = 0
        for user in users:
            base = (user.username or f"user{user.pk}").split("@")[0]
            candidate = f"{base}@gmail.com"
            counter = 1
                                                  
            while User.objects.filter(email=candidate).exclude(pk=user.pk).exists():
                candidate = f"{base}_{counter}@gmail.com"
                counter += 1
            if user.email != candidate:
                user.email = candidate
                user.save(update_fields=["email"])
                updated += 1
                self.stdout.write(f"Updated user {user.pk} -> {candidate}")
        self.stdout.write(self.style.SUCCESS(f"Done. Updated {updated} users."))
