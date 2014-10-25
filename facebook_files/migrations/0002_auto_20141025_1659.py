# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('facebook_files', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='folder',
            old_name='parent_id',
            new_name='parent',
        ),
        migrations.AddField(
            model_name='folder',
            name='folder_id',
            field=models.CharField(default=datetime.datetime(2014, 10, 25, 16, 59, 49, 552944, tzinfo=utc), max_length=200),
            preserve_default=False,
        ),
    ]
