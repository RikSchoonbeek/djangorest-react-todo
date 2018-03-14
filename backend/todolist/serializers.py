from rest_framework import serializers
from .models import TodoList, TodoListItem


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'title')


class TodoListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoListItem
        fields = ('id', 'title', 'todolist')
