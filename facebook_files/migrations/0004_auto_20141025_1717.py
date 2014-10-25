# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('facebook_files', '0003_auto_20141025_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent',
            field=models.ForeignKey(blank=True, to='facebook_files.Folder', null=True),
            preserve_default=True,
        ),
    ]
