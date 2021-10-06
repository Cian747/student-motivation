from django.contrib import admin
from .models import Motivation, Review, Category

# Register your models here.
admin.site.register(Motivation)
admin.site.register(Review)
admin.site.register(Category)