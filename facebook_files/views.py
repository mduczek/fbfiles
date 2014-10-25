from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import ListView

# Create your views here.

def index(request):
    return render(request, 'facebook_files/index.html')
    # return HttpResponse("Hello, world. You're at the polls index.")

class GroupView(ListView): # change to GroupView

    template_name = 'facebook_files/folder_list.html'
    context_object_name = 'group'

    def sync_groups(self, group_ids):
        matched_groups = Group.objects.filter(folder_id__in = group_ids)
        new_groups = []

        old_group_ids = [group.folder_id for group in matched_groups]
        for group_id in group_ids:
            if group_id not in old_group_ids:
                new_group = Group(name = group_id, folder_id = group_id, parent = None) # todo: change name to sth fancy
                new_groups.append(new_group)
                new_group.save()

        return matched_groups + new_groups

    def get_queryset(self):
        if 'group_ids' not in self.request.POST:
            return []

        group_ids = self.request.POST.get('group_ids')
        return  self.sync_groups(group_ids)

    def get_context_data(self):
        context = super(FileView, self).get_context_data(**kwargs)
        context['folders'] = self.get_queryset()
