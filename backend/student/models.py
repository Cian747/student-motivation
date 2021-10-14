from django.db import models
# from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
import uuid
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone

from .managers import CustomUserManager

# Create your models here.
class StudentUser(AbstractBaseUser, PermissionsMixin):
    ADMIN = 1
    STUDENT = 2

    USER_ROLE_CHOICES = (
        (ADMIN, 'Staff'),
        (STUDENT, 'Student'),
    )

    username = models.CharField(unique=True,max_length=20)
    first_name = models.CharField(max_length=30, blank=True,null=True)
    last_name = models.CharField(max_length=50, blank=True,null=True)
    email = models.EmailField()
    role = models.PositiveSmallIntegerField(choices=USER_ROLE_CHOICES, blank=True, null=True, default=2)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    modified_by = models.EmailField()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'



# ROLE_CHOICES = (
#     (1,'Staff'),
#     (2,'Student'),
#     )
    
# class Role(models.Model):
#     roles = models.PositiveSmallIntegerField(choices=ROLE_CHOICES,blank=True,null=True)

#     def __str__(self) -> str:
#        return self.roles

class Category(models.Model):
    category_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category_name

class Profile(models.Model):
    user = models.OneToOneField(StudentUser, on_delete=models.CASCADE)
    profile_photo = CloudinaryField('image',blank=True,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True,blank=True)
    profile_email = models.EmailField(blank=True,null=True)
    phone_number = models.CharField(max_length=20,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return self.user.username

class Motivation(models.Model):
    image = CloudinaryField('images', blank=True,null=True)
    video = models.FileField(blank=True, null=True)
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, null=True, on_delete=models.DO_NOTHING)
    description = models.TextField()
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(StudentUser, related_name='motivation_posts')

    def __str__(self):
       return self.title

class Review(models.Model):
    review = models.TextField()
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    motivation = models.ForeignKey(Motivation,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return self.profile.user.username

# Review subclass
class ReviewThread(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    content = models.TextField()
    review = models.ForeignKey(Review,on_delete=models.CASCADE)
    posted_at = models.DateTimeField(auto_now_add=True)

class Subscription(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
       return self.name

class WishList(models.Model):
   motivation = models.ForeignKey(Motivation, null=True, on_delete=models.CASCADE)
   profile = models.ForeignKey(Profile,on_delete=models.CASCADE, null=True)

# Classes
# Role class
# Profile - Admin to create category class
# Review
# Category class
# Motivation class
# Subscription class then incorporates sendgrid
