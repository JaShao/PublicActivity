# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
import models as md

def explore(request):
    activities = md.findAllActivities()[:8]
    # tmp = get_template('home.html')
    # html = tmp.render(Context({'activities' : activities}))
    # return HttpResponse(html)

    return render(request, 'home.html', {'activities': activities})


def host(request):
    activities = md.findConcernedActivities(request.session['email'])
    return render(request, 'host.html', {'activities': activities})
