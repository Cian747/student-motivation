# Generated by Django 3.2.7 on 2021-10-17 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscription',
            name='email',
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='name',
        ),
        migrations.AddField(
            model_name='subscription',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='student.studentuser'),
            preserve_default=False,
        ),
    ]
