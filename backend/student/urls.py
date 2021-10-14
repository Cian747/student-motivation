from django.urls import path,include
from . import views
from django.conf.urls import url
from django.conf import settings
from rest_framework import routers
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from django.conf.urls.static import static
from django.conf import settings
# from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import (
    AuthLogoutView,
    AuthUserRegistrationView,
    AuthUserLoginView,
    UserListView,
)
urlpatterns = [
    url(r'^motivation/$', views.motivation),    
    url(r'^mot/$', views.MotList.as_view()),
    # http://127.0.0.1:8000/api/mot?category=2
    # url(r'motivation/mot-id/(?P<pk>[0-9]+)/$', views.MotivationalDescription.as_view()),
    url(r'motivation/mot-cat/(?P<cat_pk>[0-9]+)/$', views.MotivationalByCategory.as_view()),
    url(r'^rev/$', views.RevList.as_view()),
    # http://127.0.0.1:8000/api/rev?motivation=2
    url(r'review/rev-id/(?P<pk>[0-9]+)/$', views.ReviewDescription.as_view()),
    url(r'^category/$', views.CategoryList.as_view()),
    url(r'^category/cat_idd/(?P<cat_pk>[0-9]+)$', views.category_id),
    path('review_thread/<int:id>',views.review_thread,name='review_thread'),
    path('wishlist/<int:pk>',views.wishlist_motivation,name='wishlist'),
    
    path('profile/',views.profile, name='profile'),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', AuthUserRegistrationView.as_view(), name='register'),
    # path('login', obtain_jwt_token),
    path('login', AuthUserLoginView.as_view(), name='login'),
    path('logout',AuthLogoutView.as_view(),name='logout'),
    # path('users', UserListView.as_view(), name='users'),
    path('subscribe/<int:pk>',views.subscription_service,name='category_subscription'),
    path('users', views.all_users, name='users'),
    path('remove_user',views.remove_user,name='user_deactivate'),
    path('review/<int:id>', views.review,  name = 'review'),
    path('current_user', views.current_user),
    path('superuser/<int:pk>',views.change_to_superuser,name='superuser_status'),


]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

