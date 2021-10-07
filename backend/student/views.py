from django.shortcuts import render
from django.http.response import Http404, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import  Motivation,Review,Profile
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserListSerializer,
    MotivationSerializer,
    ReviewSerializer,
    ProfileSerializer,
)

from .models import StudentUser

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

class GetProfileView(APIView):
    # permission_classes = (IsAuthenticated,)

        # def get_permissions(self):
        # if self.request.method in permissions.SAFE_METHODS:
        #     return (permissions.AllowAny(),)

        # if self.request.method == 'POST':
        #     return (permissions.AllowAny(),)

        # return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def get_profile(self,request):
        user = request.user.id
        try:
            return Profile.objects.get(pk=user)
        except Profile.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        profile = self.get_profile(pk)
        serializers = ProfileSerializer(profile)
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


class AuthUserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)

class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'username': serializer.data['username'],
                    'role': serializer.data['role']
                }
            }

            return Response(response, status=status_code)

class UserListView(APIView):
    serializer_class = UserListSerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user.role != 1:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = StudentUser.objects.all()
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data

            }
            return Response(response, status=status.HTTP_200_OK)

class UserProfileView(RetrieveAPIView):

    # permission_classes = (IsAuthenticated,)
    # authentication_class = JSONWebTokenAuthentication

    def get_profile(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Http404

    def get(self,request, pk):
        try:
            user_profile = self.get_profile(pk)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile fetched successfully',
                'data': [{
                    'profile_name': user_profile.profile_name,
                    'profile_photo': user_profile.profile_photo,
                    'profile_email': user_profile.profile_email,
                    'phone_number': user_profile.phone_number,
                    'created_at': user_profile.created_at,
                    }]
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
# @authentication_classes((JWTAuthentication))
def profile(request):
    user = request.user
    # print(user)
    profile = Profile.objects.get(user=user)
    # print(profile)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        # serializer = UserProfileSerializer(user, many=False)
        profile_serializer = ProfileSerializer(instance=profile, data=request.data['profile'])
        
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response("User deleted!...")

# Check if the user has admin privileges 
# Create a secondary function to handle deactivation of the user
