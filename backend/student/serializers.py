from .models import Category, StudentUser,Motivation,Review,Profile, Subscription, WishList
from rest_framework import fields, serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Motivation, Review, Profile, Category,ReviewThread
from .email import send_welcome_email



class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'username',
            'email',
            'role',
            'password'
            # 'password2'
        )

    def create(self, validated_data):
        auth_user = StudentUser.objects.create_user(**validated_data)
        return auth_user

class SuperUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'is_superuser',
        )

class ActiveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'is_active',
        )

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'first_name',
            'last_name'
        )
    


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            # update_last_login(None, user)

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'username': user.username,
                'role': user.role,
            }

            return validation
        except StudentUser.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'role',
            'is_active',
            'is_staff',
            'is_superuser',
        )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_name')

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault(), source="user.username",)
    category = CategorySerializer( read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user','profile_photo','category','profile_email','phone_number', 'created_at')

# class UserSerializer(serializers.ModelSerializer):
#     # account = ProfileSerializer(source="profilemodel", many=False)

#     class Meta:
#         model = User
#         fields = ["username", "email", "first_name", "last_name", "account"]
#         read_only_fields = ["id"]

#     def update(self, instance, validated_data):
#         profile_data = validated_data.get("profilemodel")

#         instance.username = validated_data.get('username', instance.username)
#         instance.first_name = validated_data.get('first_name', instance.first_name)
#         instance.last_name = validated_data.get('last_name', instance.last_name)
#         instance.email = validated_data.get('email', instance.email)
        
#         instance.save()
#         return instance



class MotivationPostSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    # category = CategorySerializer( read_only=True)
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', 'created_at')


class MotivationSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    category = CategorySerializer( read_only=True)
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', 'created_at')

class ReviewSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    motivation= MotivationSerializer(read_only = True)
    class Meta:
        model = Review
        fields = ('id', 'review', 'profile', 'motivation', 'created_at')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_name')

class SubscriptionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault(), source="user.username",)
    category = CategorySerializer(read_only=True)
    class Meta:
        model= Subscription
        fields = ('id','user','category')

        def save(self):
            name = self.validated_data['name']
            email = self.validated_data['email']
            # category = self.validated_data['category']
            send_welcome_email(name=name, receiver=email)

class ReviewThreadSerializer(serializers.ModelSerializer):
    review = ReviewSerializer(read_only=True)
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = ReviewThread
        fields = ('id','review','profile','content','posted_at')

        # def to_representation(self, instance):
        #     response = super().to_representation(instance)
        #     response['review'] = ReviewSerializer(instance.review).data
        #     return response

class WishListSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    motivation = MotivationSerializer(read_only=True)

    class Meta:
        model = WishList
        fields = ('profile','motivation')


