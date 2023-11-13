from django.core.management.base import BaseCommand
from authentication.models import CustomUser
from posts.models import Post, Comment
from messenger.models import Message, Room

class Command(BaseCommand):
    help = "Delete of data from database"

    def handle(self, *args, **options):
        self.stdout.write("Deleting data from database...")
        CustomUser.objects.all().delete()
        Post.objects.all().delete()
        Comment.objects.all().delete()
        Room.objects.all().delete()
        Message.objects.all().delete()
        self.stdout.write("Deleted all data from database.")