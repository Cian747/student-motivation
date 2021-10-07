from django.urls import path,include
from . import views
from django.conf.urls import url
from django.conf import settings
from rest_framework import routers
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
    path('users', UserListView.as_view(), name='users'),
    url(r'^api/motivation/$', views.MotivationList.as_view()),
    url(r'^api/review/$', views.ReviewList.as_view()),
    url(r'api/motivation/mot-id/(?P<pk>[0-9]+)/$', views.MotivationalDescription.as_view()),
    url(r'api/review/rev-id/(?P<pk>[0-9]+)/$', views.ReviewDescription.as_view())
]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)