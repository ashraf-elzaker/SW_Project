                                               

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_messages', '0002_alter_usermessage_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermessage',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
