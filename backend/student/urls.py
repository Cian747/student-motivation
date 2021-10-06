from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from django.conf.urls.static import static
from django.conf import settings


from .views import (
    AuthUserRegistrationView,
    AuthUserLoginView,
    UserListView
)

urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', AuthUserRegistrationView.as_view(), name='register'),
    path('login', AuthUserLoginView.as_view(), name='login'),
    path('users', UserListView.as_view(), name='users')
]


# from django.urls import path,include
# from . import views
# from rest_framework import routers

# from rest_framework.authtoken.views import obtain_auth_token


# router = routers.DefaultRouter()
# # router.register(r'users', views.UserViewSet)


# urlpatterns = [
#     path('', include(router.urls)),
#     path('auth/',obtain_auth_token),
# ]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)