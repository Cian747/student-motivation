from rest_framework import serializers
from .models import Motivation, Review, Category

class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', )

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'review', 'motivation')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_name')

