import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpringBoardService from '../services/SpringBoardService';

const useProjects = (classId) => {
  const allclassteamproj = async () => {
    try {
      const res = await SpringBoardService.getAllClassroomTeamAndProjects();
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error?.response?.status };
    }
  };

  const teamProjects = async (teamId) => {
    try {
      const res = await SpringBoardService.getProjectsByTeamId(teamId);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error?.response?.status };
    }
  };

  const createProjects = async ({ body }) => {
    try {
      const res = await SpringBoardService.projectCreate(body);
      return true;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  };

  const updateProjects = async (projId, { body }) => {
    try {
      const res = await SpringBoardService.projectUpdate(projId, body);
      return true;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  };

  const getProject = async (projId) => {
    try {
      const res = await SpringBoardService.getProjectById(projId);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error?.response?.status };
    }
  };

  const deleteProjects = async (projId) => {
    try {
      const res = await SpringBoardService.deleteProject(projId);
      return true;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  };

  const getProjectBoard = async (projId) => {
    try {
      const res = await SpringBoardService.getProjectBoards(projId);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error?.response?.status };
    }
  };

  return {
    allclassteamproj,
    teamProjects,
    createProjects,
    getProject,
    updateProjects,
    deleteProjects,
    getProjectBoard,
  };
};

export default useProjects;
