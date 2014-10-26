from django.conf.urls import patterns, include, url
from django.contrib import admin

from facebook_files import views

urlpatterns = patterns('',

    url(r'^$', views.index, name='index'),
    url(r'^groups$', views.groups, name='groups')
    url(r'^contact$', views.contact, name="contact")
    url(r'^about$', views.about, name="about")

)
