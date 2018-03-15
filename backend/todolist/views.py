from rest_framework import status
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import TodoList, TodoListItem
from .serializers import TodoListSerializer, TodoListItemSerializer
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
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def todolist_detail(request, pk=None):
    try:
        todolist = TodoList.objects.get(pk=pk)
        todolist_items = TodoListItem.objects.filter(todolist=todolist)
    except TodoList.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        data = {}
        todolist_serializer = TodoListSerializer(todolist)
        data['todolist'] = todolist_serializer.data
        todolist_items_serializer = TodoListItemSerializer(todolist_items, many=True)
        data['todolist_items'] = todolist_items_serializer.data
        return JsonResponse(data)


@csrf_exempt
def create_update_list_item(request):
    data = JSONParser().parse(request)
    if 'id' in data:  # Item to update has been send
        item_pk = data['id']
        try:
            list_item = TodoListItem.objects.get(pk=item_pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TodoListItemSerializer(list_item, data=data)
    else:
        serializer = TodoListItemSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=['GET'])
def todolistitem_delete(request, item_pk):
    try:
        list_item = TodoListItem.objects.get(pk=item_pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    list_item.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)



