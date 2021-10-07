from .models import StudentUser
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Motivation, Review





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
            'email',
            'role'
        )

    
class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = ('id', 'image', 'video', 'title', 'category', 'description', 'profile', )

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'review', 'motivation')