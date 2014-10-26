from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import ListView
from models import Group

# Create your views here.
import json

def index(request):
    return render(request, 'facebook_files/index.html')

def groups(request):
    return render(request, 'facebook_files/folder_list.html')

def about(request):
    return render(request, "facebook_files/about.html")

def contact(request):
    return render(request, "facebook_files/contact.html")
