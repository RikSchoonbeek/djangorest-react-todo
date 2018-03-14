from django.urls import path
from . import views

app_name = 'todolist'
urlpatterns = [
    path('list/', views.todolist_list, name='todolist_list'),
    path('list/<int:pk>/', views.todolist_detail, name='todolist_detail'),
]
