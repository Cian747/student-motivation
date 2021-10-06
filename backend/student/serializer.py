from rest_framework import serializers
from .models import Motivation, Review

class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', )

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'review', 'motivation')