from django.urls import path,include
from . import views
from django.conf import settings
from rest_framework import routers
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/',obtain_auth_token),
]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)