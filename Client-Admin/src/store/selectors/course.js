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
  key: 'courseImageState',
  get: ({ get }) => {
    const state = get(courseState);

    if (state.course && state.course.image) {
      // Assuming that the 'image' property is a valid URL or base64 string
      return state.course.image;
    }

    // Return a default image or handle the case where the image is not found
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