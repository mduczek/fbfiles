from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import ListView
from models import Group

# Create your views here.

def index(request):
    return render(request, 'facebook_files/index.html')

class GroupView(ListView):

    template_name = 'facebook_files/folder_list.html'
    context_object_name = 'groups'

    def sync_groups(self, groups):
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

        return matched_groups + new_groups

    def get_queryset(self):
        if 'groups' not in self.request.POST:
            return self.request.POST

        groups = self.request.POST.get('groups')
        return self.sync_groups(groups)

    def get_context_data(self, *args, **kwargs):
       context = super(GroupView, self).get_context_data(**kwargs)
       context['folders'] = self.get_queryset()
