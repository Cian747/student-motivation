# Generated by Django 3.2.7 on 2021-10-14 06:37

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0010_rename_motivatation_wishlist_motivation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='reviewthread',
            name='user',
        ),
        migrations.AddField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='review',
            name='profile',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='student.profile'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reviewthread',
            name='profile',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='student.profile'),
            preserve_default=False,
        ),
    ]