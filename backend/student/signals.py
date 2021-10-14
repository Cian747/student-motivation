from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from .models import StudentUser
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=StudentUser)
def post_save_create_profile(sender,instance,created,**kwargs):
    if created:
        Profile.objects.create(user=instance)