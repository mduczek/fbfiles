from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import ListView

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class FileView(ListView):

    template_name = 'facebook_files/index.html'

    def get_queryset(self):
        return []
