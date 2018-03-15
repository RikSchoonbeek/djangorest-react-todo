from django.urls import path
from . import views

app_name = 'todolist'
urlpatterns = [
    path('list/', views.todolist_list, name='todolist_list'),
    path('list/<int:pk>/', views.todolist_detail, name='todolist_detail'),
    path('list/item/add/', views.create_update_list_item, name='todolistitem_create'),
    path('list/item/update/<int:item_pk>/',
         views.create_update_list_item,
         name='todolistitem_update'),
    path('list/item/delete/<int:item_pk>/',
         views.todolistitem_delete,
         name='todolistitem_delete'),
]
