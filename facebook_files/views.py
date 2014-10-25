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
    #if 'groups' not in request.POST:
        #return json.dumps(request.POST)
    #groups_str = request.POST.get('groups')
    #groups_json = json.loads(groups_str)

    #context = {}
    #context['folders'] = sync_groups(groups_json['groups']['data'])

    #return render(request, 'facebook_files/folder_list.html', context)

def sync_groups(groups):
    from datetime import datetime
    group_ids = [group['id'] for group in groups]

    matched_groups = Group.objects.filter(folder_id__in = group_ids).all()
    new_groups = []

    old_group_ids = [group.folder_id for group in matched_groups]
    for group in groups:
        group_id = group['id']
        group_name = group['name']
        if group_id not in old_group_ids:
            new_group = Group(name = group_name, folder_id = group_id, parent = None, last_modified=datetime.now())
            new_groups.append(new_group)
            new_group.save()

    return Group.objects.filter(folder_id__in = group_ids)
