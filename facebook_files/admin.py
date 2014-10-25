from django.contrib import admin

from facebook_files.models import File, Folder, Group

# Register your models here.

admin.site.register(File)
admin.site.register(Folder)
admin.site.register(Group)
