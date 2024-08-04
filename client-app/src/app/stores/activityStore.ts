import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export class ActivityStore{
    //title = "Hello from Mobx!";
    activities : Activity[] = [];
    activityRegistry = new Map<string, Activity>(); //using javascript map to store activities as key value pair
    selectedActivity : Activity | undefined = undefined;
    editMode : boolean = false;
    loading : boolean = false;
    loadingInitial : boolean = false;


    constructor(){
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action 
        // })

        makeAutoObservable(this); //same action as makeObservable with less code
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
             //Date.parse(a.date) - Date.parse(b.date));
             a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=>{
                const date = activity.date!.toISOString().split('T')[0]; 
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    //use arrow function to use action.bound because arrow function bound to an object.
    // setTitle = () => {
    //     this.title = this.title + "!";
    // }

    loadActivities = async () => {
        // this.loadingInitial = true;
        this.setloadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity=>{
                //activity.date = activity.date.split('T')[0];
                //this.activities.push(activity);
                //this.activityRegistry.set(activity.id, activity);
                this.setActivity(activity);
                })
            //this.loadingInitial = false;
            this.setloadingInitial(false);
            
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);
            
        }
    }

    loadActivity = async (id : string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setloadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;    
                })
                this.setloadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setloadingInitial(false);
            }
        }
    }

    private setActivity = (activity : Activity) => {
        //activity.date = activity.date.split('T')[0];
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id : string) => {
        return this.activityRegistry.get(id);
    }

    setloadingInitial = (state : boolean) => {
        this.loadingInitial = state;
    }

    // selectActivity = (id : string) => {
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id? : string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity : Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id : string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                //if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }
}