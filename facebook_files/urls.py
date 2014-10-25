from django.conf.urls import patterns, include, url
from django.contrib import admin

from facebook_files import views

urlpatterns = patterns('',

    url(r'^$', views.index, name='index'),
    url(r'^groups$', views.GroupView.as_view(), name='groups')

)
