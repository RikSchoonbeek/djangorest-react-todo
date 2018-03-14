from django.db import models


class TodoList(models.Model):
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(null=True)

    def __str__(self):
        return self.title


class TodoListItem(models.Model):
    title = models.CharField(max_length=255)
    todolist = models.ForeignKey(TodoList,
                                 on_delete=models.CASCADE)
    order = models.PositiveIntegerField(null=True)

    def __str__(self):
        return self.title
