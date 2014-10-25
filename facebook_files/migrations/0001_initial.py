# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('url', models.URLField(max_length=2048)),
                ('post_content', models.TextField()),
                ('user_id', models.CharField(max_length=200)),
                ('add_date', models.DateTimeField(verbose_name=b'Date published')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('folder_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='facebook_files.Folder')),
                ('last_modified', models.DateTimeField(verbose_name=b'Last modified')),
            ],
            options={
            },
            bases=('facebook_files.folder',),
        ),
        migrations.AddField(
            model_name='folder',
            name='parent_id',
            field=models.ForeignKey(to='facebook_files.Folder'),
            preserve_default=True,
        ),
    ]
