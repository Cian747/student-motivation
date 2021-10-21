from django.shortcuts import render
from django.http.response import JsonResponse, Http404, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework import status
from .serializers import MotivationSerializer, MotivationPostSerializer, ReviewSerializer,CategorySerializer, ProfileSerializer
from .models import  Category, Motivation,Review, Profile, ReviewThread,WishList
from django.contrib.auth.decorators import user_passes_test
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from django.http import Http404
from .email import send_welcome_email
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserListSerializer,
    ProfileSerializer,
    SubscriptionSerializer,
    SuperUserSerializer,
    ActiveUserSerializer,
    ReviewThreadSerializer,
    WishListSerializer,
    UserUpdateSerializer
)

from .models import StudentUser, Profile

# Create your views here.
###### motivation
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def motivat(request, profile):
    try:
        topic = Motivation.objects.get(profile=profile)
        
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        print(topic)
        request.data["profile"] = topic
        serializer = MotivationSerializer(data=request.data)
        print (request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def motivation(request):
    user = request.user
    # profile = Profile.objects.get(user=user)
    # serializer = ProfileSerializer(profile, many=False)
    if request.method == 'GET':
        # motivation = Motivation.objects.all()
        motivation = Motivation.objects.order_by('-created_at')
       
        motivation_serializer = MotivationSerializer(motivation, many=True)
        return JsonResponse(motivation_serializer.data, safe=False)
    
    elif request.method == 'POST':
        user = request.user
        serializers = MotivationPostSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save(
                profile = Profile.objects.filter(user=user).first()
            )
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        
        

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def motivation_id(request, pk):
    try: 
        motivation = Motivation.objects.filter(pk=pk).first() 

    except Motivation.DoesNotExist: 
        return JsonResponse({'message': 'The motivation does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        motivation_serializer = MotivationSerializer(motivation,many=False) 

        return JsonResponse(motivation_serializer.data) 
    
    elif request.method == 'PUT': 
        motivational_data = JSONParser().parse(request) 
        motivation_serializer = MotivationSerializer(motivation, data=motivational_data) 
        if motivation_serializer.is_valid(): 
            motivation_serializer.save() 
            return JsonResponse(motivation_serializer.data) 
        return JsonResponse(motivation_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        motivation.delete() 
        return JsonResponse({'message': 'Motivation was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
class MotList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Motivation.objects.all()
    serializer_class = MotivationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category','profile']
    
    
class MotivationalByCategory(APIView):
    permission_classes = (AllowAny, )
    filter_backends = [DjangoFilterBackend]
    def get_mot(self, cat_pk):
        try:
            # return Motivation.objects.get(category=cat_pk)
            motivations=Motivation.objects.filter(category=cat_pk).order_by('-created_at')

            return motivations
        except Motivation.DoesNotExist:
            return Http404
    def get(self, request,cat_pk, format=None):
        motivation = self.get_mot(cat_pk)
        serializers = MotivationSerializer(motivation,many=True)

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
        return JsonResponse({'message': 'Category was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        
 
##### Review   

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def review(request, id):
    user = request.user
    motivation = Motivation.objects.filter(id=id).first()
    # profile = Profile.objects.get(user=user)
    # serializer = ProfileSerializer(profile, many=False)
    if request.method == 'GET':
        reviews = Review.objects.filter(motivation=motivation).order_by('-created_at')
        # review = Review.objects.order_by('-created_at')
        review_serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(review_serializer.data, safe=False)
    
    elif request.method == 'POST':
        user = request.user
        serializers = ReviewSerializer(data = request.data)
        
        if serializers.is_valid():
            serializers.save(
                profile = Profile.objects.filter(user=user).first(),
                motivation = Motivation.objects.filter(id=id).first()

            )
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class RevList(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['motivation',]

class ReviewList(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, format=None):
        review = Review.objects.order_by('-created_at')
        serializers =ReviewSerializer(review, many=True)
        return Response(serializers.data)

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


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((AllowAny, ))
def review_mot_id(request, mot_pk):
    try: 
        review = Review.objects.get(motivation=mot_pk) 
    except Review.DoesNotExist: 
        return JsonResponse({'message': 'The review does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        review_serializer = ReviewSerializer(review) 
        return JsonResponse(review_serializer.data) 

    elif request.method == 'DELETE': 
        review.delete() 
        return JsonResponse({'message': 'Review was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

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

class AuthLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAdminUser,)

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
    #         user_serializer = UserListSerializer(use,data=request.data )

    #         if user_serializer.is_valid():
    #             user_serializer.save()
    #             return Response(user_serializer.data, status=status.HTTP_200_OK)
    #     else:
    #         return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,))
@user_passes_test(lambda u: u.is_superuser)
def remove_user(request,id):

    user = request.user.id
    current_user = StudentUser.objects.get(id=id)
    
    if request.method == 'GET':
        serializer = UserListSerializer(current_user,many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'PUT':
        user_serializer = ActiveUserSerializer(current_user,data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT'])
@permission_classes((IsAdminUser,))
@user_passes_test(lambda u: u.is_superuser)
def change_to_superuser(request,pk):
    user = request.user
    new_user = StudentUser.objects.filter(pk=pk).first()
    if request.method == 'GET':
        user_serializer = UserListSerializer(new_user,many=False)
        return Response(user_serializer.data,status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        new_user_serializer = SuperUserSerializer(new_user,data=request.data)

        if new_user_serializer.is_valid():
            new_user_serializer.save()
            return Response(new_user_serializer.data,status = status.HTTP_200_OK)
        else:
            return Response(new_user_serializer.errors,status = status.HTTP_400_BAD_REQUEST)
            
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
# @authentication_classes((JWTAuthentication,))
def profile(request):
    user = request.user

    profile = Profile.objects.filter(user=user).first()

    if request.method == 'GET':
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        profile_serializer = ProfileSerializer(instance=profile, data=request.data,context={'request': request})
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Check if the user has admin privileges 
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def review_thread(request,id):
    user = request.user

    review = Review.objects.filter(id=id).first()
    found_thread = ReviewThread.objects.filter(review=review).order_by('-posted_at')
    if request.method == 'GET':
        serializer = ReviewThreadSerializer(found_thread,many=True)
        return Response(serializer.data,status = status.HTTP_200_OK)

    elif request.method == 'POST':
        review_serializer = ReviewThreadSerializer(data=request.data,context={'request': request})

        if review_serializer.is_valid():
            # review_serializer.review = review
            review_serializer.save(
                review = Review.objects.get(id=id),
                profile = Profile.objects.filter(user=user).first()
            )
            return Response(review_serializer.data,status = status.HTTP_200_OK)
        else:
            return Response(review_serializer.errors,status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
# @authentication_classes((JWTAuthentication,))
def current_user(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserListSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        user_serializer = UserUpdateSerializer(user, data=request.data,context={'request': request})
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Make subscription api
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((IsAuthenticated,))
def subscription_service(request,pk):
    category = Category.objects.filter(pk=pk).first()
    user = request.user

    if request.method == 'GET':
        serializer = SubscriptionSerializer(category, many=False,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        subscription_serializer = SubscriptionSerializer(data=request.data,context={'request': request})
 
        if subscription_serializer.is_valid():
            name = user.username
            receiver = user.email

            subscription_serializer.save(
            category = Category.objects.filter(pk=pk).first(),
            user = request.user
            )
            send_welcome_email(name=name, receiver=receiver)
            return Response(subscription_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def wishlist_motivation(request,pk):
    user = request.user

    profile = Profile.objects.filter(user=user).first()
    wishlist = WishList.objects.filter(profile=profile).all()
    motivation = Motivation.objects.get(pk=pk)

    if request.method == 'GET':
        wishlist_serializer = WishListSerializer(wishlist,many=True)
        return Response(wishlist_serializer.data,status=status.HTTP_200_OK)

    if request.method == 'POST':
        new_wish_serializer = WishListSerializer(data=request.data)

        if new_wish_serializer.is_valid():
            new_wish_serializer.save(    
            profile = Profile.objects.filter(user=user).first(),
            motivation = Motivation.objects.get(pk=pk)
            )
            return Response(new_wish_serializer.data,status = status.HTTP_200_OK)
        else:
            return Response(new_wish_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def all_wishlist(request):
    user = request.user

    profile = Profile.objects.filter(user=user).first()
    wishlist = WishList.objects.filter(profile=profile).all()

    if request.method == 'GET':
        wishlist_serializer = WishListSerializer(wishlist,many=True)
        return Response(wishlist_serializer.data,status=status.HTTP_200_OK)


# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes((IsAuthenticated,))
# def current_user(request):
#     user = request.user

#     if request.method == 'GET':
#         serializer = UserListSerializer(user, many=False)
#         return Response(serializer.data, status=status.HTTP_200_OK)
