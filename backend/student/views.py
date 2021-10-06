from django.shortcuts import render
from django.http.response import Http404, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import  Motivation,Review
from .serializer import MotivationSerializer, ReviewSerializer

# Create your views here.
class MotivationList(APIView):
    def get(self, request, format=None):
        all_merch = Motivation.objects.all()
        serializers = MotivationSerializer(all_merch, many=True)
        return Response(serializers.data)

    def post(self, request, format=None):
        serializers = MotivationSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class MotivationalDescription(APIView):
    def get_mot(self, pk):
        try:
            return Motivation.objects.get(pk=pk)
        except Motivation.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        motivation = self.get_mot(pk)
        serializers = MotivationSerializer(motivation)
        return Response(serializers.data)

class MotCategory(APIView):
    def get_motv(self, category):
        try:
            return Motivation.objects.filter(category=category).all()
        except Motivation.DoesNotExist:
            return Http404

    def get(self, request, category, format=None):
        motivation = self.get_motv(category)
        serializers = MotivationSerializer(motivation)
        return Response(serializers.data)

class ReviewList(APIView):
    def get(self, request, format=None):
        all_merch = Review.objects.all()
        serializers =ReviewSerializer(all_merch, many=True)
        return Response(serializers.data)

    def post(self, request, format=None):
        serializers = ReviewSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewDescription(APIView):
    def get_rev(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        review = self.get_rev(pk)
        serializers = ReviewSerializer(review)
        return Response(serializers.data)
