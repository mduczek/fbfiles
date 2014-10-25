from django.db import models

# Create your models here.

class File(models.Model):

    name = models.CharField(max_length=200)
    url = models.URLField(max_length=2048)
    post_content = models.TextField()
    user_id = models.CharField(max_length=200)
    add_date = models.DateTimeField('Date published')


class Folder(models.Model):

    name = models.CharField(max_length=200)
    parent_id = models.ForeignKey('Folder')


class Group(Folder):

    last_modified = models.DateTimeField('Last modified')
