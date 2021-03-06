from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
import models as md

def setting(request):
    #TODO check whether user have signin
    print request.session['email']
    return render(request, 'setting.html', {'user': md.findUser(request.session['email'])})


def s_setting(request):

    oldPwd = request.POST['oldPwd']
    newPwd = request.POST['newPwd']
    confirmPwd = request.POST['confirmPwd']

    print request.POST['gender']

    md.updatePwd(request.session['email'], oldPwd, newPwd, confirmPwd)

    introduction = request.POST['introduction']
    gender = request.POST['gender']
    avatar = request.POST['avatar']
    tags = request.POST['tags']
    md.updateBasicInfo(introduction, gender, avatar, tags)

    return HttpResponseRedirect('/setting')
