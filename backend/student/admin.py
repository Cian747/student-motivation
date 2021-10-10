from django.contrib import admin
from .models import Category, StudentUser,Motivation,Review,WishList,Profile
# Register your models here.

admin.site.register(StudentUser)
admin.site.register(Profile)
admin.site.register(Motivation)
admin.site.register(Category)
admin.site.register(Review)
admin.site.register(WishList)

