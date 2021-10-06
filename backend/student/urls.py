from django.urls import path,include
from . import views
from django.conf.urls import url
from django.conf import settings
from rest_framework import routers
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/',obtain_auth_token),
    url(r'^api/motivation/$', views.MotivationList.as_view()),
    url(r'^api/review/$', views.ReviewList.as_view()),
    url(r'api/motivation/mot-id/(?P<pk>[0-9]+)/$', views.MotivationalDescription.as_view()),
    url(r'api/motivation/mot-cat/(?P<category>[0-9]+)/$', views.MotCategory.as_view()),
    url(r'api/review/rev-id/(?P<pk>[0-9]+)/$', views.ReviewDescription.as_view())
]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)