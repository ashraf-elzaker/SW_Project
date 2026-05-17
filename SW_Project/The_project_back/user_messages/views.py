                                    

from rest_framework.generics import ListCreateAPIView
from .models import UserMessage
from .serializers import MessageSerializer


class MessageView(ListCreateAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        return UserMessage.objects.filter(sender=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
