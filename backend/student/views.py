from django.shortcuts import render
from django.http.response import JsonResponse, Http404, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .models import  Category, Motivation,Review, Profile
from .serializers import MotivationSerializer, ReviewSerializer,CategorySerializer, ProfileSerializer
from django.contrib.auth.decorators import user_passes_test
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserListSerializer,
    ProfileSerializer,
    SubscriptionSerializer,
    SuperUserSerializer,
    ActiveUserSerializer,
)

from .models import StudentUser

# Create your views here.

###### motivation
class MotivationList(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, format=None):
        all_merch = Motivation.objects.all()
        serializers = MotivationSerializer(all_merch, many=True)
        return Response(serializers.data)

    def post(self, request, format=None):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializers = MotivationSerializer(data=request.data)
        profile_serializer = ProfileSerializer(profile, many=False)
        if serializers.is_valid():
            serializers.profile=profile_serializer
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class MotivationalDescription(APIView):
    permission_classes = (AllowAny, )
    def get_mot(self, pk):
        try:
            return Motivation.objects.get(pk=pk)
        except Motivation.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        motivation = self.get_mot(pk)
        serializers = MotivationSerializer(motivation)
        return Response(serializers.data)

class MotList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Motivation.objects.all()
    serializer_class = MotivationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category','profile']


class MotivationalByCategory(APIView):
    permission_classes = (AllowAny, )
    def get_mot(self, cat_pk):
        try:
            # return Motivation.objects.get(category=cat_pk)
            motivations=Motivation.objects.filter(category=cat_pk)
            return motivations
        except Motivation.DoesNotExist:
            return Http404

    def get(self, request,cat_pk, format=None):
        motivation = self.get_mot(cat_pk)
        serializers = MotivationSerializer(motivation)
        return Response(serializers.data)

#### Category
class CategoryList(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, format=None):
        all_cat = Category.objects.all()
        serializers = CategorySerializer(all_cat, many=True)
        return Response(serializers.data)

    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        serializers = CategorySerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def category_id(request, cat_pk):
    try: 
        category = Category.objects.get(pk=cat_pk) 
    except Category.DoesNotExist: 
        return JsonResponse({'message': 'The category does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        category_serializer = CategorySerializer(category) 
        return JsonResponse(category_serializer.data) 

    elif request.method == 'PUT': 
        category_data = JSONParser().parse(request) 
        category_serializer = CategorySerializer(category, data=category_data) 
        if category_serializer.is_valid(): 
            category_serializer.save() 
            return JsonResponse(category_serializer.data) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 

    elif request.method == 'DELETE':
        category.delete()
        return JsonResponse({'message': '{} category was deleted successfully!'.format(category[0])}, status=status.HTTP_204_NO_CONTENT)
    
    
        

##### Review   

class ReviewList(APIView):
    permission_classes = (AllowAny, )
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

class RevList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['motivation',]

class ReviewDescription(APIView):
    permission_classes = (AllowAny, )
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

@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAdminUser,))
@user_passes_test(lambda u: u.is_superuser)
def all_users(request):

    user = request.user

    users = StudentUser.objects.all()

    if request.method == 'GET':
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # for use in users:
    #     if request.method == 'PUT':
    #         user_serializer = UserListSerializer(use,data=request.data['is_active'])

    #         if user_serializer.is_valid():
    #             user_serializer.save()
    #             return Response(user_serializer.data, status=status.HTTP_200_OK)
    #     else:
    #         return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,))
@user_passes_test(lambda u: u.is_superuser)
def remove_user(request):
    user = request.user

    # current_user = StudentUser.objects.get(id=user)

    if request.method == 'GET':
        serializer = UserListSerializer(user,many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        user_serializer = ActiveUserSerializer(user,data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT'])
@permission_classes((AllowAny,))
def change_to_superuser(request):

    user = request.user
    if request.method == 'GET':
        user_serializer = UserListSerializer(user,many=False)
        return Response(user_serializer.data,status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        new_user_serializer = SuperUserSerializer(user,data=request.data)

        if new_user_serializer.is_valid():
            new_user_serializer.save()
            return Response(new_user_serializer.data,status = status.HTTP_200_OK)
        else:
            return Response(new_user_serializer.errors,status = status.HTTP_400_BAD_REQUEST)

    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((AllowAny,))
# @authentication_classes((JWTAuthentication,))
def profile(request):
    user = request.user
    profile = Profile.objects.get(user=user)

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
        profile.delete()
        return Response("User deleted!...")

# Check if the user has admin privileges 
# Create a secondary function to handle deactivation of the user

# Make subscription api
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny,))
def subscription_service(request):
    category = Category.objects.last().id

    if request.method == 'GET':
        serializer = SubscriptionSerializer(category, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # serializer = UserProfileSerializer(user, many=False)
        subscription_serializer = SubscriptionSerializer(catergory=category, data=request.data['profile'])
        
        if subscription_serializer.is_valid():
            subscription_serializer.save()
            return Response(subscription_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


