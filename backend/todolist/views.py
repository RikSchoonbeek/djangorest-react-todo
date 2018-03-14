from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import TodoList, TodoListItem
from .serializers import  TodoListSerializer, TodoListItemSerializer
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def todolist_list(request):
    if request.method == "GET":
        todolists = TodoList.objects.all()
        serializer = TodoListSerializer(todolists, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = TodoListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def todolist_detail(request, pk=None):
    try:
        todolist = TodoList.objects.get(pk=pk)
        todolist_items = TodoListItem.objects.filter(todolist=todolist)
    except TodoList.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        data = {}
        todolist_serializer = TodoListSerializer(todolist)
        data['todolist'] = todolist_serializer.data
        todolist_items_serializer = TodoListItemSerializer(todolist_items, many=True)
        data['todolist_items'] = todolist_items_serializer.data
        return JsonResponse(data)


@csrf_exempt
def create_list_item(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = TodoListItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

