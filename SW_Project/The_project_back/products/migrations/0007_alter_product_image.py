                                             

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_add_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products/', verbose_name='Product Image'),
        ),
    ]
