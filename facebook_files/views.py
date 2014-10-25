from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import ListView
from models import Group

# Create your views here.
import json

def index(request):
    return render(request, 'facebook_files/index.html')

def groups(request):
    if 'groups' not in request.POST:
        return json.dumps(request.POST)
    groups = request.POST.get('groups')
    sync_groups(groups)
    context = {}
    context['folders'] = groups
    return render(request, 'facebook_files/folder_list.html', context)

def sync_groups(groups):
        group_ids = [group['data']['id'] for group in groups]

        matched_groups = Group.objects.filter(folder_id__in = group_ids)
        new_groups = []

        old_group_ids = [group.folder_id for group in matched_groups]
        for group in groups:
            group_id = group['data']['id']
            group_name = group['data']['name']
            if group_id not in old_group_ids:
                new_group = Group(name = group_name, folder_id = group_id, parent = None)
                new_groups.append(new_group)
                new_group.save()

