# import sendgrid
# import os
# from sendgrid.helpers.mail import Mail, Email, To, Content
# from .models import StudentUser
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


# my_sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))


# def send_email(name,receiver):
    # Change to your verified sender
# from_email = Email("kaisermoringa1@gmail.com")  

# # Change to your recipient
# to_email = To('cian.omondi@student.moringaschoo.com')  

# subject = "Welcome to Student Motivation."
# content = Content("text/plain", "consectetur adipiscing elit")

# mail = EmailMultiAlternatives(from_email, to_email, subject, content)

# # Get a JSON-ready representation of the Mail object
# mail_json = mail.get()

# # Send an HTTP POST request to /mail/send
# response = my_sg.client.mail.send.post(request_body=mail_json)
# print(response.status_code)
# print(response.body)
# print(response.headers)

def send_welcome_email(name,receiver):
    # Creating message subject and sender
    subject = 'Welcome to the Stud Motive Family'
    sender = 'kaisermoringa1@gmail.com'

    #passing in the context vairables
    text_content = render_to_string('email/studentemail.txt',{"name": name})
    html_content = render_to_string('email/studentemail.html',{"name": name})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()
    
# name = 'Cian'
# receiver = 'cian.omondi@student.moringaschool.com'
# send_welcome_email(name,receiver)
