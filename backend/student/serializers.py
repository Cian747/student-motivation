from .models import Category, StudentUser,Motivation,Review,Profile
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = (
            'username',
            'email',
            'role',
            'password'
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
            'username',
            'email',
            'role',
            'is_active',
            'is_staff',
            'is_superuser',
        )

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Profile
        fields = ('id', 'user','profile_photo','category','profile_email','phone_number')

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

class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', )

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'review', 'motivation')

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ('id','name','email','category')