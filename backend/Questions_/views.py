from rest_framework import generics
from .models import Questions
from .serializers import QuestionsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def show_question(request):
    if request.method == 'GET':
        # Return all records of data base
        question = Questions.objects.all()

        # Create an instance of the serializers whit the date received in the request
        serializer = QuestionsSerializer(question, many=True)

        # Return an answer in JSON format whit serialized data 
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Create an instance of the serializers whit the date received in the request
        serializer = QuestionsSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the serialized object in the data base 
            serializer.save()
            return Response(serializer.data, status=201)  # Return response with serialized data and status code 201 (created)
            print(serializer.errors)
        print(serializer.errors)
        return Response(serializer.errors, status=400)
        

@api_view(['GET'])
def question_id(request, id):
    try:
        # Get questions by id
        question = Questions.objects.get(id=id)
    except Question.DoesNotExist:
        # If question doesn't exist, return error answer 
        return Response({"message": "The question, doesn't exist."}, status=404)

    # Create a instance of hits serializer and pass the obtained object
    serializer = QuestionsSerializer(question)
    # Return a response in JSON format with serialized data
    return Response(serializer.data)