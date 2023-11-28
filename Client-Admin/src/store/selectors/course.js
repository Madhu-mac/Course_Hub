import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const isCourseLoading = selector({
  key:'isCourseLoadingState',
  get: ({get}) =>{
    const state = get(courseState)

    return state.isLoading
  },
});

export const courseDetails = selector({
  key: 'courseDetailsState',
  get: ({get}) =>{
    const state = get(courseState)

    return state.course;
  },
});

export const courseTitle = selector({
  key: 'courseTitleState',
  get: ({get}) =>{
    const state = get(courseState)
    if(state.course){
      return state.course.title;
    }
    return "Course not found"
  },
});

export const coursePrice = selector({
  key: 'coursePriceState',
  get: ({get}) =>{
    const state = get(courseState)
    if(state.course){
      return state.course.price;
    }
    return "";
  },
});

export const courseImage = selector({
  key:'courseImageState',
  get: ({get}) =>{
    const state = get(courseState)
    if (state.course) {
      // Assuming that the course object has an 'image' property
      // Modify this part according to your actual data structure
      const imageLink = state.course.image;

      // Check if the image link is truthy (not undefined or null)
      if (imageLink) {
        return imageLink;
      }
    }
    return "image not found";
  },
});

export const courseDescription = selector({
  key:'courseDescriptionState',
  get: ({get}) =>{
    const state = get(courseState)
    if(state.course){
      return state.course.description
    }
    return ""
  }, 
});